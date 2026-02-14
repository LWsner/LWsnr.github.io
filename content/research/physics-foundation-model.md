+++
title = 'Towards a Physics Foundation Model'
date = '2025-09-24'
draft = false
abstract = """Foundation models have revolutionized natural language processing through a ``train once, deploy anywhere'' paradigm, where a single pre-trained model adapts to countless downstream tasks without retraining. Access to a Physics Foundation Model (PFM) would be transformative -- democratizing access to high-fidelity simulations, accelerating scientific discovery, and eliminating the need for specialized solver development. Yet current physics-aware machine learning approaches remain fundamentally limited to single, narrow domains and require retraining for each new system. We present the General Physics Transformer (GPhyT), trained on 1.8 TB of diverse simulation data, that demonstrates foundation model capabilities are achievable for physics. Our key insight is that transformers can learn to infer governing dynamics from context, enabling a single model to simulate fluid-solid interactions, shock waves, thermal convection, and multi-phase dynamics without being told the underlying equations. GPhyT achieves three critical breakthroughs: (1) superior performance across multiple physics domains, outperforming specialized architectures by up to 29x, (2) zero-shot generalization to entirely unseen physical systems through in-context learning, and (3) stable long-term predictions through 50-timestep rollouts. By establishing that a single model can learn generalizable physical principles from data alone, this work opens the path toward a universal PFM that could transform computational science and engineering. """
authors = ['Lea Maria Wiesner', 'Prof. Matthias Wessling', 'Prof. Stephen Baek']
publication = 'Under review at ICML 2026'
publication_year = 2025
paper_url = 'https://arxiv.org/abs/2509.13805'
image = '/images/pfm/nextstep/euler_peri_gt_channel_3.gif'
image_alt = 'Euler shock waves'
tags = ['foundation-model', 'machine-learning']
+++

With this work, I wanted to explore whether the concept of foundation models (LLMs for language) can be applied to physics simulations. The idea is to train a single model on a large corpus of diverse simulation data, such that it can generalize to new physical systems without retraining.
I also wrote a [blog post](https://flowsnr.github.io/blog/physics-foundation-model/) explaining the work in more detail.